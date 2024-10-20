import { Icons } from "./../../ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

export const api_url = "https://stage.megadolls.com/api/templates/";

export const useData = () => {
  const [templatesData, setTemplatesData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchTemplates = () => {
    setisLoading(true);
    axios
      .get(api_url)
      .then((res) => {
        setTemplatesData(
          res.data.map((item) => ({ ...item, selected: false }))
        );
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  const fetchSubscribers = () => {
    setisLoading(true);
    axios
      .get("https://stage.megadolls.com/api/emails/")
      .then((res) => {
        setSubscribersData(
          res.data.map((item) => ({ ...item, selected: false }))
        );
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  useEffect(() => {
    fetchSubscribers();
    fetchTemplates();
    console.log(subscribersData);
  }, []);

  return {
    isLoading,
    fetchTemplates,
    fetchSubscribers,
    templatesData,
    subscribersData,
  };
};

export const usePagination = (
  totalItems,
  itemsPerPage = 5,
  initialPage = 1,
  maxVisibleButtons = 5
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  // Function to handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle next and previous clicks
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Calculate which buttons to show based on current page and total pages
  const getPageButtons = () => {
    const buttons = [];
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust startPage and endPage if the range is outside valid bounds
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
      endPage = totalPages;
    }

    // Ensure startPage and endPage are integers
    startPage = Math.floor(startPage);
    endPage = Math.ceil(endPage);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push({
        page,
        onClick: () => handlePageClick(page),
        isActive: page === currentPage,
      });
    }

    return buttons;
  };

  const Buttons = ({ center, className, changePage }) => (
    <div className="flex items-center justify-end gap-1 mt-6">
      <button
        className=" h-8 w-8 rounded-lg flex items-center justify-center hover:bg-gray duration-200"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <Icons.dropdown className="rotate-90" />
      </button>
      {getPageButtons().map(({ page, onClick, isActive }) => (
        <div key={page} className={`page-item ${isActive ? "active" : ""}`}>
          <button
            className={`${
              currentPage == page ? "bg-gray text-black" : ""
            } text-xs font-medium h-8 w-8 rounded-lg cursor-pointer duration-200 `}
            onClick={() => {
              onClick();
              changePage && changePage(page); // Call changePage here
            }}
          >
            {page}
          </button>
        </div>
      ))}
      <button
        className=" h-8 w-8 rounded-lg flex items-center justify-center hover:bg-gray duration-200"
        onClick={nextPage}
        disabled={
          currentPage === totalPages
            ? true
            : currentPage > totalPages
            ? true
            : false
        }
      >
        <Icons.dropdown className="-rotate-90" />
      </button>
    </div>
  );

  return {
    currentPage: Math.floor(currentPage),
    totalPages: Math.floor(totalPages),
    Buttons,
  };
};

export const sendToSubcribers = ({ template, recipients }) => {
  axios
    .post("https://stage.megadolls.com/api/send-newsletter/", {
      recipients: recipients,
      subject: template.subject,
      content_html: template.content,
    })
    .then((res) => toast.success("Template successfully sent to recipients"))
    .catch((err) => console.log(err));
};
