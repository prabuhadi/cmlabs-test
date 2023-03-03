import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [lists, setList] = useState(null);

  const ref = useRef([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("list.php", {
        cancelToken: source.token,
        params: {
          i: "list",
          key: "1",
        },
      })
      .then((res) => {
        setList(res.data.meals);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return false;
        } else {
          console.log(err);
        }
      });

    return () => {
      source.cancel();
    };
  }, [ref.current.length]);

  return (
    <div className="grid grid-cols-5 gap-5">
      {lists &&
        lists.map((list, i) => {
          const { strIngredient, idIngredient } = list;
          return (
            <Link
              to={`/meals/${strIngredient}`}
              key={idIngredient}
              className="flex flex-col items-center shadow-lg border p-5 rounded-lg hover:bg-slate-200"
            >
              <div ref={(e) => (ref.current[i] = e)} className="w-full h-40">
                <img
                  data-src={`https://themealdb.com/images/ingredients/${strIngredient}.png`}
                  alt=""
                  className="w-full h-full object-contain opacity-0 transition-all duration-1000 observe"
                />
              </div>
              <h1 className="text-2xl font-semibold">{strIngredient}</h1>
            </Link>
          );
        })}
    </div>
  );
}

export default Dashboard;
