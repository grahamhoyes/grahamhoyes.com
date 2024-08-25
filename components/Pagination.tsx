import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  return (
    <div className="my-8 flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Previous
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
