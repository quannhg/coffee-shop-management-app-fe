import { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { ControllerRenderProps } from 'react-hook-form';
import { Avatar } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { memberSearchService } from '@services';
import { useMemberGeneralStore, useSearchMember } from '@states';
import { escapeRegexCharacters } from '@utils';
import { useQueryMember } from '@hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const SearchMember: Component<{
  setValue?: (memberId: string) => void;
  isResetLeaderName?: React.MutableRefObject<boolean>;
  error?: boolean;
  selectedLeaderName?: React.MutableRefObject<boolean>;
  field?: ControllerRenderProps<ProjectCreationParams, keyof ProjectCreationParams>;
  label?: string;
  searchBar?: boolean;
}> = ({ setValue, isResetLeaderName, error, selectedLeaderName, field, label, searchBar }) => {
  const [memberName, setMemberName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchMember[]>([]);
  const { setCurrentInputValue, resetCurrentInputValue, currentInputValue } = useSearchMember();
  const { memberGeneral, setMemberGeneral, setActivePage, setInputPage } = useMemberGeneralStore();
  const { memberParam, queryMemberParam } = useQueryMember();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (isResetLeaderName?.current) {
      resetCurrentInputValue();
      isResetLeaderName.current = false;
    }
    setMemberName(currentInputValue);
  }, [currentInputValue, isResetLeaderName, resetCurrentInputValue]);

  const theme = {
    container: 'react-select_member-autosuggest__container',
    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted'
  };

  const getSuggestionValue = (suggestion: SearchMember) => suggestion.name;

  const getSuggestions = async (value: string) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    try {
      const listMember = await memberSearchService.searchByName(escapedValue);
      return listMember;
    } catch (err) {
      throw (err as ResponseError).message;
    }
  };

  const renderSuggestion = (
    suggestion: SearchMember,
    { query }: Autosuggest.RenderSuggestionParams
  ) => {
    const suggestionText = suggestion;
    const matches = AutosuggestHighlightMatch(suggestionText.name, query, {
      findAllOccurrences: true,
      insideWords: true
    });
    const parts = AutosuggestHighlightParse(suggestionText.name, matches);
    return (
      <div className='w-full flex px-3 py-2 items-center cursor-pointer'>
        <Avatar
          src={suggestion.avatarUrl}
          alt={suggestion.name}
          size='sm'
          style={{ marginRight: '1.5em' }}
        />
        <span>
          {parts.map((part, index) => {
            return (
              <span key={index} className={part.highlight ? 'text-red-500 font-bold' : ''}>
                {part.text}
              </span>
            );
          })}
        </span>
      </div>
    );
  };

  const renderSuggestionsContainer = ({
    containerProps,
    children
  }: Autosuggest.RenderSuggestionsContainerParams) => (
    <div
      {...containerProps}
      className='bg-white opacity-100 z-10 peer h-full max-h-64 overflow-auto w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent !p-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!border-0 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
    >
      {children}
    </div>
  );

  const renderInputComponent = (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div
      className={
        'relative h-10 w-full min-w-[200px] ' + (searchBar ? 'max-w-[500px]' : 'max-w-[800px]')
      }
    >
      <div className='absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500'>
        <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5' />
      </div>
      <input
        {...inputProps}
        {...field}
        autoComplete='off'
        value={inputProps.value}
        onChange={inputProps.onChange}
        className={
          'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border focus:border-2' +
          (error
            ? ' focus:border-red-500 placeholder-shown:border-red-500 placeholder-shown:border-t-red-500 '
            : ' focus:border-teal-300 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 ') +
          'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
        }
        placeholder=' '
      />
      <label
        className={
          "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight" +
          (error
            ? ' peer-placeholder-shown:text-red-500 peer-focus:text-red-500 peer-focus:before:border-red-500 peer-focus:after:border-red-500 '
            : ' peer-placeholder-shown:text-blue-gray-500 peer-focus:text-teal-300 peer-focus:before:border-teal-300 peer-focus:after:border-teal-300 ') +
          'peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
        }
      >
        {label ? label : 'Trưởng nhóm'}
      </label>
    </div>
  );

  const onSuggestionsFetchRequested = async ({
    value
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const suggestionValue = await getSuggestions(value);
    setSuggestions(suggestionValue);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchBar) {
      const suggestions = await getSuggestions(event.currentTarget.value);
      setInputPage('1');
      setActivePage(1);

      await queryMemberParam(memberParam);

      if (suggestions.length !== 0) {
        const idSuggestions = suggestions.map((item) => item.id);
        const filteredData = memberGeneral.data.filter((item) => idSuggestions.includes(item.id));

        const searchMemberGeneral: MemberResponse = {
          ...memberGeneral,
          data: filteredData
        };

        setMemberGeneral(searchMemberGeneral);
      }
    }
  };

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion, method }: Autosuggest.SuggestionSelectedEventData<SearchMember>
  ) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    field?.onChange({ suggestion, method });
    setMemberName(suggestion.name);
    setValue && setValue(suggestion.id);
    setCurrentInputValue(suggestion.name);
    if (selectedLeaderName) selectedLeaderName.current = true;
    if (searchBar) navigate(`/member/${suggestion.id}`);
  };

  const inputProps = {
    value: memberName,
    onChange: (event: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
      setMemberName(newValue);
      field?.onChange(event);
      if (selectedLeaderName) selectedLeaderName.current = false;
    },
    onKeyDown
  };

  return (
    <div
      className={
        'relative h-10 w-full min-w-[200px] ' + (searchBar ? 'max-w-[500px]' : 'max-w-[800px]')
      }
    >
      <Autosuggest
        theme={theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        focusInputOnSuggestionClick={false}
      />
    </div>
  );
};
