import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  modelQuery: Query<T[], T>;
  query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchAbleFields: string[]) {
    if (this.query.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (filed) =>
            ({
              [filed]: { $regex: this.query.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeField.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const limit = Number(this?.query?.limit) || 1;
    const page = Number(this?.query?.page) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields() {
    const fields =
      (this?.query?.fields as string).split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder