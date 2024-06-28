import { query } from "express";
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this.query?.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: this.query.searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this
  }

  filter() {
    const queryObjCopy = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "field"];
    excludeFields.forEach((el) => delete queryObjCopy[el]);
    this.queryModel = this.queryModel.find(queryObjCopy as FilterQuery<T>);
    return this

  }

  sort() {
    let sort=this.query?.sort as string
    if(sort){
      sort=sort.split(',').join(' ')
      this.queryModel = this.queryModel.sort(sort as string);
    }
    return this

  }

  paginate() {
    let page = 1;
    let skip = 0;
    const limit = this.query?.limit || 9007199254740991;
    skip =
      (Number(this.query.page || page) - 1) * Number(this.query.limit || 0);
    this.queryModel = this.queryModel.skip(skip).limit(limit as number);
    return this

  }

  fields() {
    let fieldsToShow = this.query.field as string;
    if (fieldsToShow) {
      fieldsToShow = fieldsToShow.split(",").join(" ");
    }
    this.queryModel = this.queryModel.select(fieldsToShow);
    return this

  }
}


export default QueryBuilder;