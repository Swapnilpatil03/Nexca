"use client";
import { Button, Input, Textarea } from "@/components/atoms";
import SpeechToText from "@/components/organisms/SpeechToText";
import {
  POST_API_URL,
  SECTIONS_API_URL,
  SERVICES_API_URL,
} from "@/config/apiConstants";
import { SECTIONS_QUERY_KEY, SERVICES_QUERY_KEY } from "@/config/Constants";
import useFetch from "@/hooks/useFetch";
import { PostsCashType } from "@/types/CashTypes";
import FormHandler from "@/util/handler/FormHandler";
import { checkMaster } from "@/util/Util";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CategoryList, SelectField, SelectFiledSkeleton } from "../elements";
import { FormLayout, ImagePreview } from "../shared";
import TiptapEditor from "../TiptapEditor";
import CategoriesForm from "./CategoriesForm";
import { templatesData } from "@/config/tempaltes";

const EditPostForm = ({ post }: { post: PostsCashType }) => {
  const EDITMODE = post._id !== "new";
  const router = useRouter();
  let master = checkMaster();

  const startingTicketData = {
    title: EDITMODE ? post.title : "",
    description: EDITMODE ? post.description : "",
    body: EDITMODE ? post.body : "",
    templates: EDITMODE ? post.templates : "1",
    section: EDITMODE ? post.section : "1",
    services: EDITMODE ? post.services : "1",
    imgurl: EDITMODE ? post.imgurl : "",
    categories: EDITMODE ? post.categories ?? [] : [],
    masterEditor: master ? true : false,
    source: EDITMODE ? post.source : "",
    author: master ? "masterEditor" : EDITMODE ? post.author : "",
  };

  const [formData, setFormData] = useState(startingTicketData);
  const handler = new FormHandler(setFormData, POST_API_URL, router);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    handler.submit(e, formData, post._id);

  const { data: services, loading: serviceLoading } = useFetch(
    SERVICES_QUERY_KEY,
    SERVICES_API_URL
  );
  const { data: sections, loading: sectionLoading } = useFetch(
    SECTIONS_QUERY_KEY,
    SECTIONS_API_URL
  );

  return (
    <FormLayout
      title={EDITMODE ? "Edit Post" : "New Post"}
      isLoading={handler.isLoading}
    >
      <form
        onSubmit={handleSubmit}
        method="post"
        className="mb-3 flex w-full flex-col gap-3 md:flex-row"
      >
        <div className="w-full md:w-1/2">
          <SelectField
            id="templates"
            name="templates"
            label="templates"
            value={formData.templates}
            onChange={handler.trakeChange}
            options={templatesData}
          />
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <div className="w-full">
              {serviceLoading ? (
                <SelectFiledSkeleton label="Services" />
              ) : (
                <SelectField
                  id="services"
                  name="services"
                  label="Services"
                  value={formData.services}
                  onChange={handler.trakeChange}
                  options={services}
                />
              )}
            </div>
            <div className="w-full">
              {sectionLoading ? (
                <SelectFiledSkeleton label="Section" />
              ) : (
                <SelectField
                  id="section"
                  name="section"
                  label="Section"
                  value={formData.section}
                  onChange={handler.trakeChange}
                  options={sections}
                />
              )}
            </div>
          </div>

          <Input
            type="text"
            id="title"
            name="title"
            label="Title"
            className="w-full mb-2"
            color="input-primary"
            value={formData.title}
            onChange={handler.trakeChange}
            required
          />
          <Textarea
            id="description"
            name="description"
            className="w-full mb-2"
            color="textarea-primary"
            label="description"
            value={formData.description}
            onChange={handler.trakeChange}
          />
          {/* Add New Category */}

          {!EDITMODE && <CategoriesForm handler={handler} />}
          {/* Categories List */}
          {!EDITMODE && formData.categories.length > 0 ? (
            <div className="flex flex-col gap-2">
              <h4>Categories</h4>
              {formData.categories.map((category) => (
                <CategoryList
                  key={category.id}
                  category={category}
                  onChange={handler.trakeChange}
                  onRemove={handler.removeCategory}
                />
              ))}
            </div>
          ) : null}
          <Input
            type="text"
            id="source"
            name="source"
            label="source"
            className="w-full mb-2"
            color="input-primary"
            value={formData.source}
            onChange={handler.trakeChange}
          />
          <SpeechToText />
          <Button
            type="submit"
            color="btn-primary"
            aria-label={EDITMODE ? "Save" : "Post"}
            className="btn-active mt-3 hidden w-full md:block"
          >
            {EDITMODE ? "Save" : "Post"}
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <ImagePreview
            imgurl={formData.imgurl}
            title={formData.title}
            onChange={handler.trakeChange}
          />
          <div id="tiptap-style">
            <label htmlFor="body" className="label">
              Body
            </label>
            <TiptapEditor
              content={formData.body}
              onChange={handler.trakeBodyChanges}
            />
          </div>
          {!master && (
            <Input
              type="text"
              id="author"
              name="author"
              label="author"
              className="w-full mb-2"
              color="input-primary"
              value={formData.author}
              onChange={handler.trakeChange}
            />
          )}
          <Button
            type="submit"
            color="btn-primary"
            aria-label={EDITMODE ? "Save" : "Post"}
            className="btn-active mt-3 block w-full md:hidden"
          >
            {EDITMODE ? "Save" : "Post"}
          </Button>
        </div>
      </form>
    </FormLayout>
  );
};

export default EditPostForm;
