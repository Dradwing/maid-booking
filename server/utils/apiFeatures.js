class APIFeatures {
  constructor(query, querySting) {
    this.query = query;
    this.querySting = querySting;
  }
  filter() {
    //1)Simple filtering
    const queryObj = { ...this.querySting };
    const excludedFields = ["sortby", "fields", "services"];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    //2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gt|gte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    //3) Sorting
    if (this.queryString.sortby) {
      this.queryString = this.queryString.sortby.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }
  limiting() {
    //4) Limiting
    if (this.querySting.fields) {
      const fields = this.querySring.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select(
        "-__v -passwordChangedAt -passwordResetToken -passwordResetExpires"
      );
    }
    return this;
  }
  paginating() {
    //5) Pagination
    const page = (this.queryString.page * 1) | 1;
    const limit = (this.querySting.limit * 1) | 30;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
