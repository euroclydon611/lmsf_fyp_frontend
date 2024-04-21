import { FaImages } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from ".././../redux/store";
import { styles } from "../../styles";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateBookMutation } from "../../redux/features/book/bookApi";
const schema = Yup.object().shape({
  // title: Yup.string().required("Title is required"),
  // description: Yup.string().required("Description is required"),
  // category: Yup.string().required("Category is required"),
  // stock: Yup.number().required("Stock is required"),
});

const categoriesData: any = [
  { title: "Information Technology" },
  { title: "Business Administatrion" },
  { title: "General" },
];

const CreateBook = ({ setOpen, refetch }: any) => {
  const [images, setImages] = useState<any>([]);

  const { user } = useSelector((state: RootState) => state.auth);

  const [createBook, { data: data, isSuccess, isLoading, error }] =
    useCreateBookMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      authors: "",
      description: "",
      publicationDate: "",
      publisher: "",
      category: "",
      pages: "",
      totalStock: "",
      availableStock: "",
    },
    validationSchema: schema,
    onSubmit: async ({
      title,
      authors,
      description,
      publicationDate,
      publisher,
      category,
      pages,
      totalStock,
      availableStock,
    }) => {
      const authorsArray = authors
        .split(",")
        .map((author: string) => author.trim());

      await createBook({
        title,
        authors: authorsArray,
        description,
        publicationDate,
        publisher,
        category,
        pages,
        totalStock,
        availableStock,
        images,
        patronId: user && user._id,
      });
    },
  });

  const handleImageChange = (e: any) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages: any) => [...prevImages, ...files]);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = `${data?.message}` || "Successful!";
      toast.success(message, { duration: 5000 });
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.error, { duration: 5000 });
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <div className="bg-white  shadow rounded-[4px] p-3 overflow-y-auto">
        <h5 className="text-[20px] text-center">Add Book</h5>
        {/* create product form */}
        <form onSubmit={handleSubmit}>
          <br />
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
              required
            />
            {errors.title && touched.title && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.title}
              </span>
            )}
          </div>
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Author(s)</label>
            <input
              type="text"
              name="authors"
              value={values.authors}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder="Enter authors separated by commas"
              required
            />
            {errors.authors && touched.authors && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.authors}
              </span>
            )}
          </div>
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Description</label>
            <textarea
              cols={30}
              rows={5}
              name="description"
              value={values.description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
              required
            />
            {errors.description && touched.description && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.description}
              </span>
            )}
          </div>
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Category</label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              required
            >
              <option value="Choose a category">-----</option>
              {categoriesData &&
                categoriesData.map((i: any) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
            {errors.category && touched.category && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.category}
              </span>
            )}
          </div>
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>No. of Pages</label>
            <input
              type="number"
              name="pages"
              value={values.pages}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
              required
            />
            {errors.pages && touched.pages && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.pages}
              </span>
            )}
          </div>
          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Publisher</label>
            <input
              type="text"
              name="publisher"
              value={values.publisher}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
            />
          </div>

          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Publication Year</label>
            <input
              type="number"
              name="publicationDate"
              value={values.publicationDate}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
            />
          </div>

          <div className="w-full mb-3">
            <label className={`${styles.label}`}>Total Stock</label>
            <input
              type="number"
              name="totalStock"
              value={values.totalStock}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={handleChange}
              placeholder=""
              required
            />
            {errors.totalStock && touched.totalStock && (
              <span className="text-red-500 pt-2 block fade-in">
                {errors.totalStock}
              </span>
            )}
          </div>

          <div className="w-full mb-3">
            <label className={`${styles.label}`}>
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
              required
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <FaImages size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((image: any, index: number) => (
                  <img
                    src={URL.createObjectURL(image)}
                    key={`${image}-${index}`} // <-- Use a combination of image properties and index
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
          </div>

          <div className="w-full mb-3">
            <input
              type="submit"
              value={`${isLoading ? "Please wait" : "Submit"}`}
              className="mt-2 bg-gray-900 text-white cursor-pointer appearance-none text-center block w-full px-3 h-[35px] rounded-[3px]sm:text-sm"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBook;
