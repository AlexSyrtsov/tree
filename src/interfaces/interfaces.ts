export interface ICategory {
  category_name: string;
  category_id: string;
}

export interface IBrand {
  brand_name: string;
  brand_id: string;
}

export interface IModel {
  model_name: string;
  _id: string;
  varients: Array<IVariant>;
}

export interface IVariant {
  varient: string;
  current_price: number;
}

export interface ITreeItemData {
  title: string;
  id: string;
  parentId?: string;
  childrenIds?: Array<string>;
  subtitle?: string;
  disabled?: boolean;
  checked?: boolean;
  tagTitle?: string;
}
