import React, { useState, useRef, useEffect } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import { Button } from "antd";

const MyPdfViewer = ({ height, cv, cvTarget }) => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);
  const { pdfDocument } = usePdf({
    file: `/assets/pdf/${cv?.email}/${
      cvTarget.name + "-" + cvTarget.style
    }.pdf`,
    page,
    canvasRef,
  });
  useEffect(() => {
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.width = "100%";
        canvasRef.current.style.height = height + "px";
      }
    }, 10);
  }, [pdfDocument, canvasRef, height, page]);
  return (
    <div
      style={{ marginTop: 38, overflow: "hidden", width: "100%" }}
      className="pb-4"
    >
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <div className="pb-10">
          <div className="pager">
            <div className="previous">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
            </div>
            <div className="next">
              <Button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MyPdfViewer;
