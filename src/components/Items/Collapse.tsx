import { Input } from "@/components/atoms";
import { CollapseType } from "@/types/entities";
import React from "react";

interface Props {
  data: CollapseType;
}

const Collapse: React.FC<Props> = ({ data }: Props) => {
  return (
    <>
      <div key={data.id} className="collapse join-item collapse-arrow border">
        <Input
          id={`nexca-question-${data.id}`}
          type="radio"
          name="my-accordion-4"
          defaultChecked={true}
        />
        <label
          htmlFor={`nexca-question-${data.id}`}
          className="collapse-title text-xl font-bold"
        >
          {data.label}
        </label>
        <div className="collapse-content">{data.body}</div>
      </div>
    </>
  );
};

export default Collapse;
