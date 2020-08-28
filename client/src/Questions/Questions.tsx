import React, { Component } from "react";
import { IQuestion } from "../graphql-types";
import Question from "./Question";
import { Button, ListGroup, Dropdown } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { css } from "@emotion/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { FaListUl, FaKeyboard, FaRegCircle } from "react-icons/fa";

interface Props {
  questions: IQuestion[];
  surveyId: string;
}

const CREATE_QUESTION = gql`
  mutation CreateQuestion($surveyId: ID!, $type: String!, $order: Int!) {
    createQuestion(surveyId: $surveyId, type: $type, order: $order) {
      id
      text
      type
      order
    }
  }
`;

const REORDER_QUESTIONS = gql`
  mutation ReorderQuestions($input: ReorderQuestionsInput!) {
    reorderQuestions(input: $input)
  }
`;

const Questions: React.FC<Props> = ({ questions, surveyId }) => {
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    update: (cache, response) => {
      const data: any = cache.readQuery({
        query: gql`
          query Survey($id: ID!) {
            survey(id: $id) {
              id
              name
              active
              questions {
                id
                text
                type
                order
              }
            }
          }
        `,
        variables: {
          id: surveyId,
        },
      });

      cache.writeQuery({
        query: gql`
          query Survey($id: ID!) {
            survey(id: $id) {
              id
              name
              active
              questions {
                id
                text
                type
                order
              }
            }
          }
        `,
        variables: {
          id: surveyId,
        },
        data: {
          survey: {
            ...data.survey,
            questions: [...data.survey.questions, response.data.createQuestion],
          },
        },
      });
    },
  });

  const handleCreateQuestion = (type: string) => {
    createQuestion({
      variables: {
        surveyId,
        order: questions.length,
        type,
      },
    });
  };

  const [reorderQuestions] = useMutation(REORDER_QUESTIONS);

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((result: any, index: number) => ({
      ...result,
      order: index,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "SURVEY") {
      const reordered: any = reorder(
        questions,
        result.source.index,
        result.destination.index
      );

      reorderQuestions({
        variables: {
          input: {
            surveyId,
            indexedIds: reordered.map((question: IQuestion) => ({
              id: question.id,
              index: question.order,
            })),
            startIndex: result.source.index,
            endIndex: result.destination.index,
          },
        },
        optimisticResponse: {},
        update: (cache) => {
          const data: any = cache.readQuery({
            query: gql`
              query Survey($id: ID!) {
                survey(id: $id) {
                  id
                  name
                  active
                  questions {
                    id
                    text
                    order
                    answers {
                      id
                      text
                      order
                    }
                  }
                }
              }
            `,
            variables: {
              id: surveyId,
            },
          });

          cache.writeQuery({
            query: gql`
              query Survey($id: ID!) {
                survey(id: $id) {
                  id
                  name
                  active
                  questions {
                    id
                    text
                    order
                    answers {
                      id
                      text
                      order
                    }
                  }
                }
              }
            `,
            variables: {
              id: surveyId,
            },
            data: {
              survey: {
                ...data.survey,
                questions: reordered,
              },
            },
          });
        },
      });
    }
  };

  return (
    <ListGroup
      css={css`
        margin-top: 15px;
      `}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {questions.length === 0 ? (
            <ListGroup.Item>
              <h3>No Questions Are Available.</h3>
              <p className="text-secondary">
                Click below to add the first question to this survey.
              </p>
              <Button onClick={() => handleCreateQuestion("radio")}>
                Add First Question
              </Button>
            </ListGroup.Item>
          ) : (
            <Droppable
              droppableId={`droppable-survey-${surveyId}`}
              type="SURVEY"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((question) => (
                    <Question
                      key={question.id}
                      question={question}
                      surveyId={surveyId}
                    />
                  ))}
                  {provided.placeholder}
                  <Dropdown
                    css={css`
                      margin-top: 25px;
                      svg {
                        font-size: 15px;
                        margin-bottom: 3.5px;
                        margin-right: 5px;
                      }
                    `}
                  >
                    <Dropdown.Toggle id="dropdown-basic">
                      Add New Question
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleCreateQuestion("check")}
                      >
                        <FaListUl />
                        Multi-Option
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleCreateQuestion("radio")}
                      >
                        <FaRegCircle />
                        One-Option
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleCreateQuestion("text")}
                      >
                        <FaKeyboard />
                        Text
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Droppable>
          )}
        </div>
      </DragDropContext>
    </ListGroup>
  );
};

export default Questions;