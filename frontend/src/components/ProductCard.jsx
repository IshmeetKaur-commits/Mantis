import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductCard({
  product,
}) {
  return (
    <Link
      to={`/product/${product.id}`}
    >
      <div
        className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        hover:shadow-xl
        transition
        duration-300
        hover:-translate-y-1
        "
      >
        <div className="text-6xl">
          🛵
        </div>

        <h2 className="text-2xl font-black mt-4 text-slate-900">
          {product.name}
        </h2>

        <p className="text-slate-600 mt-3">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-emerald-600 mt-5 font-semibold">
          Open Diagnostics
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}