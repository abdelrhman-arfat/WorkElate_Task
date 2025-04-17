import toast from "react-hot-toast";
import axiosInstance from "../util/AxiosSetting";

const Admin = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title");
    const count = formData.get("count");
    const description = formData.get("description");
    const image = formData.get("image");
    toast
      .promise(
        axiosInstance.post(
          "/books",
          {
            title,
            count,
            description,
            image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Adding book...",
          success: (res) => res.data.message || "Book added successfully",
          error: (err) => err.response.data.message || "Failed to add book",
        }
      )
      .then(() => {
        form.reset();
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Admin Panel</h1>
      </section>

      <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Add New Book
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              minLength={3}
              maxLength={30}
              placeholder="Title"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="count"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Count
            </label>
            <input
              id="count"
              type="number"
              required
              min={1}
              max={1000}
              name="count"
              placeholder="Count"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              required
              minLength={10}
              maxLength={500}
              id="description"
              name="description"
              placeholder="Description"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="image"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Book Cover
            </label>
            <input
              id="image"
              type="file"
              required
              name="image"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50 focus:outline-none focus:ring-4 focus:ring-rose-300"
            >
              Add Book
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Admin;
