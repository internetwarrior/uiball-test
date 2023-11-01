import { useEffect, useState } from "react";
import "./global.css";
import { Jelly } from "@uiball/loaders";

// КОД НАПИСАН для демонстрации

function App() {
  //----------НАЧАЛЬНЫЕ--НАСТРОЙКИ-----
  const __STEPS__ = 4;

  // Стейты
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(__STEPS__);

  //Fetch Data | Загрузить данные с API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((res) => res.json())
      .then((json) => console.log(json) || setProducts(json) || setIsLoading(false));
  }, [limit]);

  //-----------FUNCTIONS|ФУНКЦИИ----------------->>>>>>>>>

  const load_more = () => {
    setIsLoading(true);
    setLimit((prev) => prev + __STEPS__);
  };

  return (
    <>
      <GRID_WRAPPER>
        {products.map((product) => {
          return <ProductCard title={product.title} img={product.image} />;
        })}

        <div className="grid-full flex items-center justify-center p-[20px] bg-black bg-opacity-5 mb-[200px] mt-[56px]">
          {isLoading ? (
            <LoadingBar />
          ) : (
            <button type="button" className=" hover:bg-black hover:text-white p-[4px] px-[8px]" onClick={load_more}>
              Загрузить ещё
            </button>
          )}
        </div>
      </GRID_WRAPPER>
    </>
  );
}

export default App;

//------------PRODUCT--CARD--COMPONENT---------------->>>>>>>>>

export const ProductCard = (props) => {
  const { title, img } = props;
  return (
    <>
      <div className=" shadow p-[8px] rounded-[8px] overflow-hidden">
        <div className=" w-full h-full max-h-[300px]  overflow-hidden">
          <img className="w-full  object-cover h-full" src={img} alt="" />
        </div>

        <div className=" font-bold text-2xl">{title}</div>
      </div>
    </>
  );
};

//-------------LOADING--BAR---------->>>>>>>>>>>>>

export const LoadingBar = () => {
  return <Jelly size={40} speed={0.9} color="black" />;
};

//---------------GRID--WRAPPER---------->>>>>>>>>>>>

export const GRID_WRAPPER = (props) => {
  return <div className="  w-full grid grid-cols-4 gap-[20px] max-w-[1280px] mx-auto px-[20px] mt-[56px]">{props.children}</div>;
};
