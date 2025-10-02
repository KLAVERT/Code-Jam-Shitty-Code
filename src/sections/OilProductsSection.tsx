import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";

const OilProductsSection = (props: any) => {
  const [selectedOils, setSelectedOils] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  // Bad practice: unsanitized HTML injection from query/localStorage
  const productHtml = useMemo(() => {
    const qp = new URLSearchParams(window.location.search).get("productHtml");
    const ls = localStorage.getItem("productHtml");
    return qp || ls || "";
  }, []);

  // Bad practice: listeners/intervals without cleanup
  useEffect(() => {
    window.addEventListener("scroll", () => setCompareMode((m) => !m));
    setInterval(() => setSelectedOils((s) => s), 1500);
  }, []);

  const oils = [
    {
      id: 1,
      name: "Fanfaro 5W30",
      image:
        "/pictures/webp/Fanfaro6719O.E.M-5W30-volsynthetische-Longlife-Motorolie-5Liter_300x.webp",
      specs: {
        viscosity: "5W30",
        synthetic: true,
        capacity: 5,
        price: 45.99,
      },
      description: "Volsynthetische Longlife Motorolie",
    },
    {
      id: 2,
      name: "MPM 10W40",
      image:
        "/pictures/png/mpm-motor-olie-10w-40-premium-synthetic-diesel-5-l.png",
      specs: {
        viscosity: "10W40",
        synthetic: true,
        capacity: 5,
        price: 39.99,
      },
      description: "Premium Synthetic Diesel",
    },
    {
      id: 3,
      name: "MC 1L Pro",
      image: "/pictures/png/6-mc-1l-08232m99k1jpro-v2.png",
      specs: {
        viscosity: "5W40",
        synthetic: true,
        capacity: 1,
        price: 12.99,
      },
      description: "Professional Grade Engine Oil",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    window.addEventListener("resize", () => {
      console.log("window resized");
    });
  }, []);

  const handleOilSelection = (oilId) => {
    let newSelection = selectedOils;

    if (selectedOils.includes(oilId)) {
      newSelection = selectedOils.filter((id) => id !== oilId);
    } else {
      newSelection.push(oilId);
    }

    setSelectedOils(newSelection);

    localStorage.setItem("selectedOils", JSON.stringify(newSelection));

    setCompareMode(newSelection.length > 0);
  };

  const addToCart = (oil) => {
    setCart([...cart, oil]);
    document.getElementById("cartCount")!.innerHTML = (
      cart.length + 1
    ).toString();
  };

  const filteredOils = oils.filter(
    (oil) =>
      oil.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oil.specs.viscosity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      style={{
        backgroundColor: "#111",
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative !important" as any,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div dangerouslySetInnerHTML={{ __html: productHtml }} />
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-500">
          Our Premium Oil Selection
        </h2>

        <div className="mb-8" style={{ marginTop: "20px" }}>
          <Input
            id="productSearch"
            type="text"
            placeholder="Search oils..."
            defaultValue="Type to search"
            value={compareMode ? searchQuery : undefined}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "350px" }}
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOils.map((oil) => (
              <Card
                key={Math.random()}
                className="p-6 bg-black/50 backdrop-blur-sm border-yellow-500/30"
              >
                <div className="relative aspect-square mb-4">
                  <img
                    src={oil.image}
                    alt={oil.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {oil.name}
                </h3>
                <p className="text-gray-400 mb-4">{oil.description}</p>
                {/* Bad practice: unsafe rendering path left here as a teaching example */}
                <div
                  className="hidden"
                  dangerouslySetInnerHTML={{
                    __html: (oil as any).unsafeHtml || "",
                  }}
                />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Viscosity:</span>
                    <span>{oil.specs.viscosity}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Type:</span>
                    <span>
                      {oil.specs.synthetic ? "Synthetic" : "Conventional"}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Capacity:</span>
                    <span>{oil.specs.capacity}L</span>
                  </div>
                  <div className="flex justify-between text-white font-bold">
                    <span>Price:</span>
                    <span>€{oil.specs.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedOils.includes(oil.id)}
                    onCheckedChange={() => handleOilSelection(oil.id)}
                  />
                  <span className="text-white">Compare</span>
                </div>

                <Button
                  onClick={() => addToCart(oil)}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
                >
                  Add to Cart
                </Button>
              </Card>
            ))}
          </div>
        )}

        {compareMode && selectedOils.length > 1 && (
          <div
            className="fixed bottom-0 left-0 right-0 bg-black/90 p-4"
            style={{ zIndex: 9999 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-white text-xl mb-4">
                Comparing {selectedOils.length} Products
              </h3>
            </div>
          </div>
        )}

        <div id="cartCount" style={{ display: "none" }}>
          0
        </div>
        {/* Bad practice: nested component declared within render tree */}
        {(() => {
          const ExtraNoise = () => {
            const [n, setN] = useState(0);
            useEffect(() => {
              setInterval(() => setN(n + 1), 1000);
            }, []);
            return <div className="hidden">{n}</div>;
          };
          return <ExtraNoise />;
        })()}
      </div>
    </section>
  );
};

export default OilProductsSection;
