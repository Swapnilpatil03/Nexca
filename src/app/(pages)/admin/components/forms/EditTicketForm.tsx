"use client";
import { Input, Textarea } from "@/components";
import { TICKETS_API_URL } from "@/config/apiConstants";
import { TicketsCashType } from "@/types/CashTypes";
import { checkMaster } from "@/util/Util";
import FormHandler from "@/util/handler/FormHandler";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Sidebar } from "../sections";
import { FormLayout } from "../shared";

const EditTicketForm = ({ ticket }: { ticket: TicketsCashType }) => {
  const EDITMODE = ticket._id !== "new";
  const router = useRouter();
  const startingTicketData = {
    title: EDITMODE ? ticket.title : "",
    description: EDITMODE ? ticket.description : "",
    body: EDITMODE ? ticket.body : "",
    priority: EDITMODE ? ticket.priority : 1,
    progress: EDITMODE ? ticket.progress : 0,
    status: EDITMODE ? ticket.status : "not started",
    startTime: EDITMODE ? ticket.startTime : "",
    endTime: EDITMODE ? ticket.endTime : "",
  };

  const [formData, setFormData] = useState(startingTicketData);
  const handler = new FormHandler(setFormData, TICKETS_API_URL, router);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    handler.submit(e, formData, ticket._id);

  let master = checkMaster();

  return (
    <>
      {master ? (
        <div className="grid grid-cols-12 gap-5 p-5">
          <aside className="col-span-12 rounded-xl border-2 border-indigo-400 shadow-xl lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="col-span-12 mt-5 rounded-xl border-2 border-indigo-400 shadow-xl lg:col-span-9 lg:mt-0">
            <FormLayout
              title={EDITMODE ? "Edit Ticket" : "Create New Ticket"}
              isLoading={handler.isLoading}
            >
              <form onSubmit={handleSubmit} method="post">
                <div className="mb-5">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handler.trakeChange}
                    color="input-primary"
                    required
                    style="w-full"
                  />
                </div>
                <div className="mb-5">
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="description"
                    color="textarea-primary"
                    value={formData.description}
                    onChange={handler.trakeChange}
                    style="w-full"
                  />
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <Input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        placeholder="startTime"
                        value={formData.startTime}
                        onChange={handler.trakeChange}
                        color="input-primary"
                        style="w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <Input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        placeholder="endTime"
                        value={formData.endTime}
                        color="input-primary"
                        onChange={handler.trakeChange}
                        style="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <Textarea
                    id="body"
                    name="body"
                    placeholder="body"
                    value={formData.body}
                    rows={10}
                    color="textarea-primary"
                    onChange={handler.trakeChange}
                    required={true}
                    style="w-full"
                  />
                </div>
                <div className="mb-5">
                  <div className="flex gap-2">
                    <Input
                      id="priority-1"
                      name="priority"
                      type="radio"
                      label="1"
                      onChange={handler.trakeChange}
                      value={1}
                      checked={formData.priority == 1}
                      style="radio radio-primary"
                      removeDefaultStyle={true}
                    />
                    <Input
                      id="priority-2"
                      name="priority"
                      type="radio"
                      label="2"
                      onChange={handler.trakeChange}
                      value={2}
                      checked={formData.priority == 2}
                      style="radio radio-primary"
                      removeDefaultStyle={true}
                    />
                    <Input
                      id="priority-3"
                      name="priority"
                      type="radio"
                      label="3"
                      onChange={handler.trakeChange}
                      value={3}
                      checked={formData.priority == 3}
                      style="radio radio-primary"
                      removeDefaultStyle={true}
                    />
                    <Input
                      id="priority-4"
                      name="priority"
                      type="radio"
                      label="4"
                      onChange={handler.trakeChange}
                      value={4}
                      checked={formData.priority == 4}
                      style="radio radio-primary"
                      removeDefaultStyle={true}
                    />
                    <Input
                      id="priority-5"
                      name="priority"
                      type="radio"
                      label="5"
                      onChange={handler.trakeChange}
                      value={5}
                      color="input-null"
                      checked={formData.priority == 5}
                      style="radio radio-primary"
                      removeDefaultStyle={true}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <Input
                    type="range"
                    id="progress"
                    name="progress"
                    value={formData.progress}
                    min={0}
                    max="100"
                    onChange={handler.trakeChange}
                    style="bg-red-600 h-2.5 rounded-full w-full"
                    removeDefaultStyle={true}
                  />
                </div>
                <div className="mb-5">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handler.trakeChange}
                    className="select select-primary w-full"
                  >
                    <option value="not started">Not Started</option>
                    <option value="started">Started</option>
                    <option value="delay">delay</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <Input
                  type="submit"
                  style="btn w-full  btn-primary mb-5"
                  removeDefaultStyle={true}
                  value={EDITMODE ? "Update Ticket" : "Create Ticket"}
                />
              </form>
            </FormLayout>
          </main>
        </div>
      ) : (
        <FormLayout
          title={EDITMODE ? "Edit Ticket" : "Create New Ticket"}
          isLoading={handler.isLoading}
        >
          <form
            onSubmit={handleSubmit}
            method="post"
            className="mb-3 flex w-full flex-col justify-center gap-3 md:w-1/2"
          >
            <div className="mb-5">
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handler.trakeChange}
                color="input-primary"
                required
                style="w-full"
              />
            </div>
            <div className="mb-5">
              <Textarea
                id="description"
                name="description"
                placeholder="description"
                color="textarea-primary"
                value={formData.description}
                onChange={handler.trakeChange}
                style="w-full"
              />
            </div>
            <div className="mb-5">
              <Textarea
                id="body"
                name="body"
                placeholder="body"
                color="textarea-primary"
                value={formData.body}
                rows={10}
                onChange={handler.trakeChange}
                required={true}
                style="w-full"
              />
            </div>
            <Input
              type="submit"
              style="btn w-full  btn-primary mb-5"
              value={EDITMODE ? "Update Ticket" : "Create Ticket"}
              removeDefaultStyle={true}
            />
          </form>
        </FormLayout>
      )}
    </>
  );
};

export default EditTicketForm;
