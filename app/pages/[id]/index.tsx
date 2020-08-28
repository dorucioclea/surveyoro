import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Title from "../../components/Title";
import { ISurvey, IQuerySurveyArgs } from "../../graphql-types";
import Layout from "../../components/Layout/Layout";
import Question from "../../components/Question";
import { useState, useEffect } from "react";
import Details from "../../components/Details";
import { Button } from "react-bootstrap";
import { css } from "@emotion/core";
import Finished from "../../components/Finished";

const SURVEY = gql`
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
        answers {
          id
          text
          order
        }
      }
    }
  }
`;

interface ISurveyData {
  survey: ISurvey;
}

const Survey: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const [step, setStep] = useState(0);
  const [submission, setSubmission] = useState({});

  const { data, loading } = useQuery<ISurveyData, IQuerySurveyArgs>(SURVEY, {
    variables: {
      id: `${id}`,
    },
  });

  if (loading) {
    return null;
  }

  const handleSetSubmisson = (data: object) => {
    setSubmission((submission) => ({
      ...submission,
      ...data,
    }));
  };

  const questions = data.survey.questions.map((question) =>
    Question(question, {
      step,
      steps: data.survey.questions.length,
      setStep,
      setSubmission: handleSetSubmisson,
    })
  );
  const steps = [
    <Details
      step={step}
      steps={data.survey.questions.length}
      setStep={setStep}
      setSubmission={handleSetSubmisson}
    />,
    ...questions,
    <Finished submission={submission} />,
  ];

  return (
    <div
      css={css`
        button {
          margin-top: 15px;
        }
      `}
    >
      {data && (
        <Layout>
          <Title>{data.survey.name}</Title>
          {steps[step]}
        </Layout>
      )}
    </div>
  );
};

export default Survey;
