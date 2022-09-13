import { Criteria } from "@/types/Criteria";

export class FilterCriteria {
  constructor(readonly criterias: Array<Criteria>) {}

  toQueryParams(): string {
    let payload = "";
    if (!this.criterias) {
      return payload;
    }

    const searchParams = this.criterias.map((criteria: Criteria, index) => {
      payload += index == 0 ? "?" : "&";
      payload += `${criteria.parameter}=${criteria.value}`;
    });
    return payload;
  }
}
