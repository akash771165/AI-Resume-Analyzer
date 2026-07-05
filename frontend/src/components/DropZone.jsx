import { useDropzone } from "react-dropzone";

function DropZone({ file, setFile }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
            }
        },
    });

    return (
        <div
            {...getRootProps()}
            className={`mt-8 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 ${isDragActive
                ? "border-blue-500 bg-slate-800"
                : "border-slate-600 bg-slate-900 hover:border-blue-400"
                }`}
        >
            <input {...getInputProps()} />

            <div className="text-center">

                <div className="text-6xl mb-4">
                    📄
                </div>

                {isDragActive ? (
                    <p className="text-blue-400 text-lg font-semibold">
                        Drop your resume here...
                    </p>
                ) : (
                    <>
                        <p className="text-white text-lg font-semibold">
                            Drag & Drop Resume Here
                        </p>

                        <p className="text-slate-400 mt-2">
                            or click to browse
                        </p>
                    </>
                )}

                {file && (
                    <div className="mt-6 bg-green-600 rounded-xl px-5 py-3 inline-block">
                        ✅ {file.name}
                    </div>
                )}

            </div>
        </div>
    );
}

export default DropZone;