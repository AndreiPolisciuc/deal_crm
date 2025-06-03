import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";

type Props = {
    src: string; // ссылка на PDF
};

const SafePdfViewer = ({ src }: Props) => {
    const [isPdfAvailable, setIsPdfAvailable] = useState(true);
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    useEffect(() => {
        const checkPdfExists = async () => {
            try {
                const res = await fetch(src, { method: "HEAD" });
                if (!res.ok) {
                    setIsPdfAvailable(false);
                }
            } catch (err) {
                setIsPdfAvailable(false);
            }
        };

        checkPdfExists();
    }, [src]);

    if (!isPdfAvailable) {
        return <p>
            <i className="bi bi-exclamation-triangle-fill me-2" ></i>
            PDF-file not find
        </p>;
    }

    if (isMobile) {
        return (
            <div className={'d-flex justify-content-end'}>
                <Button variant={"secondary"} className={"mb-2"}
                        onClick={() => window.location.href = src}>
                    <i className="bi bi-file-earmark-pdf me-2" ></i>
                    Open File
                </Button>
            </div>
        );
    }

    return (
        <iframe
            src={src}
            style={{width: "100%", height: "800px", border: "none"}}
        />
    );
};

export default SafePdfViewer;
