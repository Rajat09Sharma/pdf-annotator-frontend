import { useEffect, useState } from "react";
import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup } from "react-pdf-highlighter";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBox } from "../components/ErrorBox";

export const ViewPdfPage = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [highlights, setHighlights] = useState([]);

  const navigate = useNavigate();

  const { loading, setLoading, error, setError } = useFetch();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();

  const addHighlight = (highlight) => {
    const newHighlight = {
      id: String(Math.random()).slice(2),
      pdfId: id,
      content: highlight.content,
      position: highlight.position,
      comment: highlight.comment,
      timestamp: new Date().toISOString()
    };

    setHighlights(prevHighlights => [...prevHighlights, newHighlight]);
    console.log("Saved highlight:", newHighlight);
  };

  useEffect(() => {
    setLoading(true);
    const fetchPdf = async () => {
      try {
        const response = await axiosPrivate.get(`/user/pdf/${id}`, {
          withCredentials: true,
        });
        const data = response.data;

        setHighlights(data.pdfData.highlights || []);
        setFileUrl(`${import.meta.env.VITE_API_BASE_URL}/${data.pdfData.fileUrl}`);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPdf();
    }
  }, [id, axiosPrivate, setLoading, setError]);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox>
        Error loading PDF: {error}
      </ErrorBox>

    );
  }

  return (
    <>
      <button onClick={() => navigate("/")} className="mt-2 ms-3 py-2 px-2 w-1/12 bg-green-700 text-white rounded-md cursor-pointer">Back</button>
      <div className="relative w-11/12 h-[75vh]  md:w-2/3 md:h-[85vh] overflow-auto mx-auto mt-0 mb-5 border border-gray-500 rounded-md">
        {fileUrl && (
          <PdfLoader url={fileUrl} beforeLoad={<div>Loading PDF...</div>}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                highlights={highlights}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => {
                  transformSelection(
                    <Tip
                      onConfirm={(comment) => {
                        addHighlight({ content, position, comment });
                        hideTipAndSelection();
                      }}
                    />
                  );
                }}
                highlightTransform={(highlight, index, setTip, hideTip) => (
                  <Popup
                    popupContent={<div>{highlight.comment.text}</div>}
                    onMouseOver={(popupContent) => setTip(highlight, () => popupContent)}
                    onMouseOut={hideTip}
                    key={index}
                  >
                    <Highlight isScrolledTo={true} position={highlight.position} comment={highlight.comment} />
                  </Popup>
                )}
              />
            )}
          </PdfLoader>
        )}
      </div>
    </>
  );
};
