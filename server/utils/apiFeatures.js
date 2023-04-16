class APIFeatures {
  constructor(query, queryString, aggregate = false) {
    this.query = query;
    this.queryString = queryString;
    this.aggregate = aggregate;
  }
  filter() {
    //1)Simple filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["sortby", "fields", "services"];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    //2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(lte|lt|gt|gte)\b/g, (match) => `$${match}`);

    queryStr = JSON.parse(queryStr);
    if (this.queryString.services)
      queryStr.services = { $all: this.queryString.services.split(",") };
    if (this.queryString.gender)
      queryStr.gender = { $in: this.queryString.gender.split(",") };

    if (this.aggregate) {
      this.query = this.query.match(queryStr);
    } else {
      this.query = this.query.find(queryStr);
    }
    return this;
  }
  sorting() {
    //3) Sorting

    if (this.queryString.sortby) {
      const sortBy = this.queryString.sortby.split(",").join(" ");
      if (this.aggregate) {
        this.query.push({ $sort: { [sortBy]: 1 } });
      } else {
        this.query = this.query.sort(sortBy);
      }
    }
    return this;
  }
  limiting() {
    //4) Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      if (this.aggregate) {
        this.query.push({ $project: fields });
      } else {
        this.query = this.query.select(fields);
      }
    } else if (!this.aggregate) {
      this.query = this.query.select(
        "-__v -passwordChangedAt -passwordResetToken -passwordResetExpires"
      );
    }
    return this;
  }
  paginating() {
    //5) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 30;
    const skip = (page - 1) * limit;
    if (this.aggregate) {
      //this.query.pipeline([{ $skip: skip }, { $limit: limit }]);  not working????
    } else {
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
module.exports = APIFeatures;
