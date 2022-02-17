import React from "react";
import { Badge } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { categoryListState } from "../abstract/EventContext";

const CategoryBadge = ({ id }) => {
  const categoryList = useRecoilValue(categoryListState);

  const value = categoryList.find((item) => {
    return item.id === id;
  });

  return <Badge className="mb-2">{value?.name}</Badge>;
};

export default CategoryBadge;
