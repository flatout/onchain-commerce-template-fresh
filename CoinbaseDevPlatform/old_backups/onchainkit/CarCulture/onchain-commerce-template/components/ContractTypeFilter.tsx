type ContractType = 'ALL' | 'BASE_ERC721' | 'BASE_ERC1155' | 'CARCULTURE_ERC721' | 'CARCULTURE_ERC1155';

interface ContractTypeFilterProps {
  selectedType: ContractType;
  onChange: (type: ContractType) => void;
}

const contractTypeLabels: Record<ContractType, string> = {
  ALL: 'All NFTs',
  BASE_ERC721: 'Base ERC-721',
  BASE_ERC1155: 'Base ERC-1155',
  CARCULTURE_ERC721: 'CarCulture ERC-721',
  CARCULTURE_ERC1155: 'CarCulture ERC-1155',
};

export function ContractTypeFilter({ selectedType, onChange }: ContractTypeFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {(Object.keys(contractTypeLabels) as ContractType[]).map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {contractTypeLabels[type]}
        </button>
      ))}
    </div>
  );
} 