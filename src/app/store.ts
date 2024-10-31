import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useStore, useSelector } from "react-redux";

export type ItemId = number;

export type Item = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
};

export type Data = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score: number;
};

type State = {
  items: Item[];
};

export type AddItemsAction = {
  type: "addItems";
  payload: {
    items: Item[];
  };
};

export type RemoveItemAction = {
  type: "removeItem";
  payload: {
    itemId: ItemId;
  };
};

const initialState: State = {
  items: [],
};

type Action = AddItemsAction | RemoveItemAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "addItems": {
      const { items } = action.payload;
      const existingIds = new Set(state.items.map((item) => item.id));
      const newItems = items.filter((item: Item) => !existingIds.has(item.id));
      return {
        ...state,
        items: [...state.items, ...newItems],
      };
    }
    case "removeItem": {
      const { itemId } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => itemId !== item.id),
      };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppState = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
