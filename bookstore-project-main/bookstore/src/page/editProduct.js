import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router";

const EditProdct = () => {
  const productedit = localStorage.getItem("bookedit");
  const bookdatajson = JSON.parse(productedit);
  const history = useNavigate();

  // Set initial state with values from bookdatajson
  const [id, setId] = useState(bookdatajson.id || "");
  const [title, setTitle] = useState(bookdatajson.title || "");
  const [author, setAuthor] = useState(bookdatajson.author || "");
  const [isbn, setIsbn] = useState(bookdatajson.isbn || "");
  const [publicationYear, setPublicationYear] = useState(
    bookdatajson.publication_year || ""
  );
  const [genre, setGenre] = useState(bookdatajson.genre || "");
  const [price, setPrice] = useState(bookdatajson.price || "");
  const [imageUrl, setImageUrl] = useState(bookdatajson.imageUrl || "");
  // console.log(bookdatajson);
  // setbookedit(bookdatajson);

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

      const response = await axios.put(
        `https://localhost:7115/api/Books/${id}`,
        Bookdata
      );

      // console.log("Product Added Successfully!", response.data);

      // Show success alert
      alert("Product Edit Successfully!");

      // Clear form after successful submission
      setId("");
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPublicationYear("");
      setGenre("");
      setPrice("");
      setImageUrl("");
      localStorage.removeItem("bookedit");
      history("/");
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
              Edit Product
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ID
                </label>
                <input
                  type="text"
                  placeholder={bookdatajson.id}
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
                  placeholder={bookdatajson.title}
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
                  placeholder={bookdatajson.author}
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
                  placeholder={bookdatajson.isbn}
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
                  placeholder={bookdatajson.publication_year}
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
                  placeholder={bookdatajson.genre}
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
                  placeholder={bookdatajson.price}
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
                  placeholder={bookdatajson.imageUrl}
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
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProdct;
