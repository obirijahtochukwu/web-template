import axios from "axios";
import { useEffect, useState } from "react";

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
