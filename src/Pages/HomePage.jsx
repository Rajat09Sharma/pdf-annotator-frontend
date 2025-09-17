import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const HomePage = () => {
    const [pdfs, setPdfs] = useState([]);
    const { setLoading, loading } = useFetch();
    const fileInputRef = useRef();

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
    
            const response = await axiosPrivate.post("user/pdf/upload", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });


            const pdfId = response.data.pdfId;
            navigate(`/pdf/${pdfId}`);

        } catch (error) {
            console.log("Upload error:", error);
        } finally {

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        setLoading(true);
        const fetchPdfs = async () => {
            try {
                const response = await axiosPrivate.get("/user/pdfs", { withCredentials: true });
                setPdfs(response?.data.pdfs || []);
            } catch (error) {
                console.error("Error fetching PDFs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPdfs();
    }, [axiosPrivate, setLoading]);


    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center max-w-2xl">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Manage Your PDFs Easily
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Upload, view, and highlight your PDF documents all in one place.
                </p>
            </div>
            <div className="mt-8">

                <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                />
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="flex items-center gap-2 px-6 py-3 text-white bg-green-700 rounded-xl shadow hover:bg-green-600 transition duration-200 cursor-pointer"
                >
                    Upload PDF
                </button>

            </div>

            {loading && <LoadingSpinner />}

            {!loading && <div className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pdfs.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No PDFs uploaded yet.
                    </div>
                ) : (
                    pdfs.map((pdf) => (
                        <div
                            key={pdf?._id}
                            onClick={() => navigate(`/pdf/${pdf._id}`)}
                            className="cursor-pointer bg-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-200 p-6 flex flex-col items-center text-center"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
                                {pdf.title || "Untitled PDF"}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                Uploaded on {new Date(pdf?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                )}
            </div>}
        </div>
    );
}
