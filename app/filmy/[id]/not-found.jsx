export default function NotFound() {
    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div className="text-center">

                <div className="card shadow-sm border-0 p-4">
                    <div className="card-body">

                        <h1 className="display-5 fw-bold text-danger mb-3">
                            404
                        </h1>

                        <h3 className="mb-3">
                            Not Found
                        </h3>

                        <p className="text-muted mb-0">
                            Przepraszamy, ale nie możemy znaleźć tego filmu.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}