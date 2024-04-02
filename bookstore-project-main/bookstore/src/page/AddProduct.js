import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";

const AddProduct = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleIsbnChange = (event) => {
    setIsbn(event.target.value);
  };

  const handlePublicationYearChange = (event) => {
    setPublicationYear(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const Bookdata = {
        id: id,
        title: title,
        author: author,
        isbn: isbn,
        publication_year: publicationYear,
        genre: genre,
        price: price,
        imageUrl: imageUrl,
      };

      const response = await axios.post(
        "https://localhost:7115/api/Books",
        Bookdata
      );

      console.log("Product Added Successfully!", response.data);

      // Show success alert
      alert("Product Added Successfully!");

      // Clear form after successful submission
      setId("");
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPublicationYear("");
      setGenre("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding product:", error);
      // Show error alert
      alert("Error adding product: " + error.message);
    }
  };
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add Product
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ID
                </label>
                <input
                  type="text"
                  placeholder="ID"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Author"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  placeholder="ISBN"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={isbn}
                  onChange={handleIsbnChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Publication Year
                </label>
                <input
                  type="text"
                  placeholder="Publication Year"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={publicationYear}
                  onChange={handlePublicationYearChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Genre
                </label>
                <input
                  type="text"
                  placeholder="Genre"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={genre}
                  onChange={handleGenreChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="Price"
                  className="input input-bordered input-info w-full max-w-full mb-2"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image URL
                </label>
                <textarea
                  placeholder="Paste image URL here..."
                  className="input input-bordered input-info w-full max-w-full mb-2 h-32"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                ></textarea>
                 {imageUrl && (
                  <div className="flex justify-center">
                    <div className="max-w-full mb-2">
                      <img
                        src={imageUrl}
                        alt="Image Preview"
                        className="mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
