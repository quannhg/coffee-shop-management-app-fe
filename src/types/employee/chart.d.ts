type AgeDistribute = {
  age: int[];
  amount: int[];
};

type GenderDistribute = {
  gender: Gender[];
  amount: int[];
};

type ChartStore = {
  ageDistribute?: AgeDistribute;
  genderDistribute?: GenderDistribute;
  getAgeDistribute: () => Promise<void>;
  getGenderDistribute: () => Promise<void>;
};
