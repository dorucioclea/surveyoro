import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type IQuery = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user: IUser;
  survey: ISurvey;
  question: IQuestion;
  submissions: Array<ISubmission>;
};


export type IQuerySurveyArgs = {
  id: Scalars['ID'];
};


export type IQueryQuestionArgs = {
  id: Scalars['ID'];
};


export type IQuerySubmissionsArgs = {
  surveyId: Scalars['ID'];
  offset: Scalars['Int'];
};

export type IIndexedId = {
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type IMutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: Scalars['Boolean'];
  login: IUserWithToken;
  createSurvey: ISurvey;
  deleteSurvey: Scalars['Boolean'];
  updateSurvey: ISurvey;
  createQuestion: IQuestion;
  deleteQuestion: Scalars['Boolean'];
  updateQuestion: IQuestion;
  reorderQuestions: Scalars['Boolean'];
  createAnswer: IAnswer;
  updateAnswer: IAnswer;
  deleteAnswer: Scalars['Boolean'];
  reorderAnswers: Scalars['Boolean'];
  addSubmission: Scalars['Boolean'];
};


export type IMutationRegisterArgs = {
  input: IRegisterInput;
};


export type IMutationLoginArgs = {
  input: ILoginInput;
};


export type IMutationCreateSurveyArgs = {
  name: Scalars['String'];
};


export type IMutationDeleteSurveyArgs = {
  id: Scalars['ID'];
};


export type IMutationUpdateSurveyArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
};


export type IMutationCreateQuestionArgs = {
  surveyId: Scalars['ID'];
  type: Scalars['String'];
  order: Scalars['Int'];
};


export type IMutationDeleteQuestionArgs = {
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
};


export type IMutationUpdateQuestionArgs = {
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
  text: Scalars['String'];
};


export type IMutationReorderQuestionsArgs = {
  input: IReorderQuestionsInput;
};


export type IMutationCreateAnswerArgs = {
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
  order: Scalars['Int'];
};


export type IMutationUpdateAnswerArgs = {
  id: Scalars['ID'];
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
  text: Scalars['String'];
};


export type IMutationDeleteAnswerArgs = {
  id: Scalars['ID'];
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
};


export type IMutationReorderAnswersArgs = {
  input: IReorderAnswersInput;
};


export type IMutationAddSubmissionArgs = {
  person: IPersonInput;
  submission: Array<ISubmissionInput>;
  surveyId: Scalars['String'];
};

export type IUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  surveys?: Maybe<Array<ISurvey>>;
};

export type IRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ILoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type IUserWithToken = {
  __typename?: 'UserWithToken';
  user: IUser;
  token: Scalars['String'];
};

export type ISurvey = {
  __typename?: 'Survey';
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  questions: Array<IQuestion>;
};

export type IQuestion = {
  __typename?: 'Question';
  id: Scalars['ID'];
  text: Scalars['String'];
  type: Scalars['String'];
  order: Scalars['Int'];
  answers: Array<IAnswer>;
};

export type IPerson = {
  __typename?: 'Person';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  answers: Array<IAnswer>;
  createdAt: Scalars['Date'];
};

export type IAnswer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  text: Scalars['String'];
  order: Scalars['Int'];
};

export type ISubmission = {
  __typename?: 'Submission';
  id: Scalars['ID'];
  personId: Scalars['ID'];
  person: IPerson;
  questionId: Scalars['ID'];
  question: IQuestion;
  answerId?: Maybe<Scalars['ID']>;
  answer?: Maybe<IAnswer>;
  answerText: Scalars['String'];
};

export type IReorderQuestionsInput = {
  surveyId: Scalars['ID'];
  indexedIds: Array<IIndexedId>;
  startIndex: Scalars['Int'];
  endIndex: Scalars['Int'];
};

export type IReorderAnswersInput = {
  surveyId: Scalars['ID'];
  questionId: Scalars['ID'];
  indexedIds: Array<IIndexedId>;
  startIndex: Scalars['Int'];
  endIndex: Scalars['Int'];
};

export type IPersonInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type ISubmissionInput = {
  questionId: Scalars['ID'];
  answerId?: Maybe<Scalars['ID']>;
  answerText: Scalars['String'];
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IndexedId: IIndexedId;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<IUser>;
  RegisterInput: IRegisterInput;
  LoginInput: ILoginInput;
  UserWithToken: ResolverTypeWrapper<IUserWithToken>;
  Survey: ResolverTypeWrapper<ISurvey>;
  Question: ResolverTypeWrapper<IQuestion>;
  Person: ResolverTypeWrapper<IPerson>;
  Answer: ResolverTypeWrapper<IAnswer>;
  Submission: ResolverTypeWrapper<ISubmission>;
  ReorderQuestionsInput: IReorderQuestionsInput;
  ReorderAnswersInput: IReorderAnswersInput;
  PersonInput: IPersonInput;
  SubmissionInput: ISubmissionInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IndexedId: IIndexedId;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  User: IUser;
  RegisterInput: IRegisterInput;
  LoginInput: ILoginInput;
  UserWithToken: IUserWithToken;
  Survey: ISurvey;
  Question: IQuestion;
  Person: IPerson;
  Answer: IAnswer;
  Submission: ISubmission;
  ReorderQuestionsInput: IReorderQuestionsInput;
  ReorderAnswersInput: IReorderAnswersInput;
  PersonInput: IPersonInput;
  SubmissionInput: ISubmissionInput;
  Date: Scalars['Date'];
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  survey?: Resolver<IResolversTypes['Survey'], ParentType, ContextType, RequireFields<IQuerySurveyArgs, 'id'>>;
  question?: Resolver<IResolversTypes['Question'], ParentType, ContextType, RequireFields<IQueryQuestionArgs, 'id'>>;
  submissions?: Resolver<Array<IResolversTypes['Submission']>, ParentType, ContextType, RequireFields<IQuerySubmissionsArgs, 'surveyId' | 'offset'>>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  register?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationRegisterArgs, 'input'>>;
  login?: Resolver<IResolversTypes['UserWithToken'], ParentType, ContextType, RequireFields<IMutationLoginArgs, 'input'>>;
  createSurvey?: Resolver<IResolversTypes['Survey'], ParentType, ContextType, RequireFields<IMutationCreateSurveyArgs, 'name'>>;
  deleteSurvey?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteSurveyArgs, 'id'>>;
  updateSurvey?: Resolver<IResolversTypes['Survey'], ParentType, ContextType, RequireFields<IMutationUpdateSurveyArgs, 'id' | 'name' | 'active'>>;
  createQuestion?: Resolver<IResolversTypes['Question'], ParentType, ContextType, RequireFields<IMutationCreateQuestionArgs, 'surveyId' | 'type' | 'order'>>;
  deleteQuestion?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteQuestionArgs, 'id' | 'surveyId'>>;
  updateQuestion?: Resolver<IResolversTypes['Question'], ParentType, ContextType, RequireFields<IMutationUpdateQuestionArgs, 'id' | 'surveyId' | 'text'>>;
  reorderQuestions?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationReorderQuestionsArgs, 'input'>>;
  createAnswer?: Resolver<IResolversTypes['Answer'], ParentType, ContextType, RequireFields<IMutationCreateAnswerArgs, 'questionId' | 'surveyId' | 'order'>>;
  updateAnswer?: Resolver<IResolversTypes['Answer'], ParentType, ContextType, RequireFields<IMutationUpdateAnswerArgs, 'id' | 'questionId' | 'surveyId' | 'text'>>;
  deleteAnswer?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteAnswerArgs, 'id' | 'questionId' | 'surveyId'>>;
  reorderAnswers?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationReorderAnswersArgs, 'input'>>;
  addSubmission?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationAddSubmissionArgs, 'person' | 'submission' | 'surveyId'>>;
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  surveys?: Resolver<Maybe<Array<IResolversTypes['Survey']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IUserWithTokenResolvers<ContextType = any, ParentType extends IResolversParentTypes['UserWithToken'] = IResolversParentTypes['UserWithToken']> = {
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ISurveyResolvers<ContextType = any, ParentType extends IResolversParentTypes['Survey'] = IResolversParentTypes['Survey']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  active?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  questions?: Resolver<Array<IResolversTypes['Question']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IQuestionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Question'] = IResolversParentTypes['Question']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  answers?: Resolver<Array<IResolversTypes['Answer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IPersonResolvers<ContextType = any, ParentType extends IResolversParentTypes['Person'] = IResolversParentTypes['Person']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  answers?: Resolver<Array<IResolversTypes['Answer']>, ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IAnswerResolvers<ContextType = any, ParentType extends IResolversParentTypes['Answer'] = IResolversParentTypes['Answer']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<IResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ISubmissionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Submission'] = IResolversParentTypes['Submission']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  personId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  person?: Resolver<IResolversTypes['Person'], ParentType, ContextType>;
  questionId?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  question?: Resolver<IResolversTypes['Question'], ParentType, ContextType>;
  answerId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>;
  answer?: Resolver<Maybe<IResolversTypes['Answer']>, ParentType, ContextType>;
  answerText?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date';
}

export type IResolvers<ContextType = any> = {
  Query?: IQueryResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserWithToken?: IUserWithTokenResolvers<ContextType>;
  Survey?: ISurveyResolvers<ContextType>;
  Question?: IQuestionResolvers<ContextType>;
  Person?: IPersonResolvers<ContextType>;
  Answer?: IAnswerResolvers<ContextType>;
  Submission?: ISubmissionResolvers<ContextType>;
  Date?: GraphQLScalarType;
};


