type AgeDistribute = {
  age: int[];
  amount: {
    male: int[];
    female: int[];
  };
};

type GenderDistribute = {
  gender: Gender[];
  amount: int[];
};

type ChartStore = {
  ageDistribute: AgeDistribute;
  genderDistribute: GenderDistribute;
  getAgeDistribute: (shopId: string) => Promise<void>;
  getGenderDistribute: (shopId: string) => Promise<void>;
};
