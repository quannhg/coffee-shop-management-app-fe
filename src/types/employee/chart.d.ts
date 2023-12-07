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

type TableDistribute = {
  statuses: string[];
  amount: int[];
};

type ChartStore = {
  ageDistribute: AgeDistribute;
  genderDistribute: GenderDistribute;
  tableDistribute: TableDistribute;
  getAgeDistribute: (shopId: string) => Promise<void>;
  getGenderDistribute: (shopId: string) => Promise<void>;
  getTableDistribute: (shopId: string) => Promise<void>;
};
