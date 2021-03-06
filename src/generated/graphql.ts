import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  id: Scalars['ID'];
  token: Scalars['String'];
};

/** Autogenerated input type of Login */
export type LoginInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  loginid: Scalars['String'];
  password: Scalars['String'];
};

/** Autogenerated return type of Login */
export type LoginPayload = {
  __typename?: 'LoginPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginPayload>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  viewer?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<AccessToken>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  loginid: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'LoginPayload', result?: boolean | null | undefined, user?: { __typename?: 'User', accessToken?: { __typename?: 'AccessToken', token: string } | null | undefined } | null | undefined } | null | undefined };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, name?: string | null | undefined } | null | undefined };

export type ViewerIdQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerIdQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string } | null | undefined };


export const LoginDocument = gql`
    mutation login($loginid: String!, $password: String!) {
  login(input: {loginid: $loginid, password: $password}) {
    user {
      accessToken {
        token
      }
    }
    result
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginid: // value for 'loginid'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ViewerDocument = gql`
    query viewer {
  viewer {
    id
    name
  }
}
    `;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
      }
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;
export const ViewerIdDocument = gql`
    query viewerId {
  viewer {
    id
  }
}
    `;

/**
 * __useViewerIdQuery__
 *
 * To run a query within a React component, call `useViewerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerIdQuery(baseOptions?: Apollo.QueryHookOptions<ViewerIdQuery, ViewerIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerIdQuery, ViewerIdQueryVariables>(ViewerIdDocument, options);
      }
export function useViewerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerIdQuery, ViewerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerIdQuery, ViewerIdQueryVariables>(ViewerIdDocument, options);
        }
export type ViewerIdQueryHookResult = ReturnType<typeof useViewerIdQuery>;
export type ViewerIdLazyQueryHookResult = ReturnType<typeof useViewerIdLazyQuery>;
export type ViewerIdQueryResult = Apollo.QueryResult<ViewerIdQuery, ViewerIdQueryVariables>;