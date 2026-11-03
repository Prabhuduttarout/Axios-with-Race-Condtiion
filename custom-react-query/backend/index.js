import express from "express";
import cors from "cors";
const app = express();

// Allow CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "table wooden",
      price: 200,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 2,
      name: "table glass",
      price: 250,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 3,
      name: "table plastic",
      price: 150,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 4,
      name: "table metal",
      price: 300,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 5,
      name: "table polyester",
      price: 150,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  // ! Filtering
  // http://localhost:3000/api/products?search=metal

  if (req.query.search) {
    const filterProducts = products.filter((prdct) =>
      prdct.name.toLowerCase().includes(req.query.search.toLocaleLowerCase()),
    );
    setTimeout(() => {
      res.send(filterProducts);
    }, 2000);
    return;
  }

  setTimeout(() => {
    res.send(products);
  }, 2000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
