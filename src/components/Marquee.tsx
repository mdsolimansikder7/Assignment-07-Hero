import { cacheLife } from "next/cache";

type Product = {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: { dir: "up" | "down"; pct: number };
};


const MARQUEE_SECONDS = 35;

const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  litre: "লিটার",
  liter: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  gram: "গ্রাম",
};

const toBanglaNumber = (value: number) => Number(value).toLocaleString("bn-BD");

const toBanglaPercent = (value: number) =>
  Number(value).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const splitName = (name: string): [string, string] => {
  const bracketIndex = name.indexOf("(");
  if (bracketIndex === -1) return [name, ""];
  return [name.slice(0, bracketIndex), name.slice(bracketIndex)];
};

const pickTickerProducts = (products: Product[]) => {
  const risenProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct);

  const fallenProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct);

  let pickedProducts = [
    ...risenProducts.slice(0, 6),
    ...fallenProducts.slice(0, 6),
  ];

  if (pickedProducts.length < 11) {
    const remainingProducts = [
      ...risenProducts.slice(6),
      ...fallenProducts.slice(6),
    ];
    pickedProducts = [
      ...pickedProducts,
      ...remainingProducts.slice(0, 11 - pickedProducts.length),
    ];
  }

  return pickedProducts.slice(0, 11);
};

async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products/",
    { signal: AbortSignal.timeout(8000) },
  );

  if (!response.ok) {
    throw new Error(`Products fetch failed: ${response.status}`);
  }

  return response.json();
}

const renderItem = (product: Product) => {
  const isPriceUp = product.change.dir === "up";
  const [mainName, bracketName] = splitName(product.nameBn);

  return (
    <span
      key={product.id}
      className="inline-flex items-center gap-1.5 whitespace-nowrap border-r border-gray-300 px-4 sm:gap-2 sm:px-6"
    >
      <span>{product.image}</span>
      <span className="font-medium">
        {mainName}
        {bracketName && (
          <span className="font-notosans font-semibold text-gray-900">
            {bracketName}
          </span>
        )}
      </span>
      <span className="text-xs text-gray-500 sm:text-sm">
        <span className="font-notosans">{toBanglaNumber(product.today)}</span>{" "}
        টাকা/{UNIT_LABELS[product.unit] ?? product.unit}
      </span>
              <span
                className={`text-xs font-medium sm:text-sm ${
                  isPriceUp
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
        {isPriceUp ? "▲" : "▼"}{" "}
        <span className="font-notosans">
          {toBanglaPercent(Math.abs(product.change.pct))}%
        </span>
      </span>
    </span>
  );
};

const Marquee = async () => {
  let tickerProducts: Product[] = [];

  try {
    tickerProducts = pickTickerProducts(await getProducts());
  } catch (error) {
    console.error("Marquee:", error);
  }

  if (tickerProducts.length === 0) return null;

  const items = tickerProducts.map((product) => renderItem(product));

  return (
    <div className="bd-marquee border-b border-gray-200 bg-[#FAFCFA] py-1.5 text-sm sm:py-2 sm:text-base">
      <div className="bd-marquee__track">
        <div className="bd-marquee__group">{items}</div>
        <div className="bd-marquee__group" aria-hidden="true">
          {items}
        </div>
      </div>

      <style>{`
        .bd-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .bd-marquee__track {
          display: flex;
          width: max-content;
          animation: bd-marquee-scroll ${MARQUEE_SECONDS}s linear infinite;
        }
        .bd-marquee:hover .bd-marquee__track {
          animation-play-state: paused;
        }
        .bd-marquee__group {
          display: flex;
          flex-shrink: 0;
        }
        @keyframes bd-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;