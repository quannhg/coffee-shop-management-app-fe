import { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { projectSearchService } from '@services';
import { escapeRegexCharacters } from '@utils';

export const SearchProject: Component<{
  setValue?: (projectId: string) => void; // value is string
  setObjectValue?: (value: Record<string, string>) => void; //value is object
  error?: boolean;
  label?: string;
  required?: boolean;
  value?: Record<string, string>;
}> = ({ setValue, setObjectValue, error, label, required, value }) => {
  const [suggestions, setSuggestions] = useState<ProjectId[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [inputEmpty, setInputEmpty] = useState<boolean>(false); //using to avoid infinite rerender at useEffect

  useEffect(() => {
    if (!inputEmpty && projectName === '') {
      if (setValue) setValue('');
      if (setObjectValue) setObjectValue({});
      setInputEmpty(true);
    }
  }, [projectName, setValue, setObjectValue, inputEmpty]);

  const [valueWasSet, setValueWasSet] = useState(false);
  useEffect(() => {
    return () => {
      setValueWasSet(false);
    };
  }, []);

  useEffect(() => {
    if (!valueWasSet && value && value.name && value.id) {
      const { name, id } = value;
      setProjectName(name);
      if (setValue) setValue(id);
      if (setObjectValue) setObjectValue({ name: name, id: id });
      setValueWasSet(true);
    }
  }, [setObjectValue, setValue, value, valueWasSet]);

  const theme = {
    container: 'react-select_project-autosuggest__container',
    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted'
  };

  const getSuggestionValue = (suggestion: ProjectId) => suggestion.name;

  const getSuggestions = async (value: string) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    try {
      const listProject = await projectSearchService.search({ name: escapedValue });
      return listProject;
    } catch (err) {
      throw (err as ResponseError).message;
    }
  };

  const renderSuggestion = (
    suggestion: ProjectId,
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
      className='peer h-full max-h-64 overflow-auto w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent !p-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!border-0 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
    >
      {children}
    </div>
  );

  const renderInputComponent = (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className='relative h-full w-full'>
      <div className='absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500'>
        <MagnifyingGlassIcon strokeWidth={2} className='w-5 h-5' />
      </div>
      <input
        {...inputProps}
        autoComplete='off'
        value={inputProps.value}
        onChange={inputProps.onChange}
        className={
          'peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border focus:border-2' +
          (error
            ? ' focus:border-red-500 placeholder-shown:border-red-500 placeholder-shown:border-t-red-500 '
            : ' focus:border-blue-500 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 ') +
          'focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
        }
        placeholder=' '
      />
      <label
        className={
          "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight" +
          (error
            ? ' peer-placeholder-shown:text-red-500 peer-focus:text-red-500 peer-focus:before:border-red-500 peer-focus:after:border-red-500 '
            : ' peer-placeholder-shown:text-blue-gray-500 peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500 ') +
          'peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
        }
      >
        {label ? label : 'Trưởng nhóm'}
        {required && <span className='pl-1 pt-0.5 text-red-500'>*</span>}
      </label>
    </div>
  );

  const onSuggestionsFetchRequested = async ({
    value
  }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const suggestionValue = await getSuggestions(value);
    if (inputEmpty) setInputEmpty(false); //this function only call when input not null, so inputEmpty must be false
    setSuggestions(suggestionValue);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLInputElement>,
    { suggestion, method }: Autosuggest.SuggestionSelectedEventData<ProjectId>
  ) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    setProjectName(suggestion.name);
    setValue && setValue(suggestion.id);
    setObjectValue && setObjectValue({ name: suggestion.name, id: suggestion.id });
  };

  const inputProps = {
    value: projectName,
    onChange: (event: React.FormEvent, { newValue }: Autosuggest.ChangeEvent) => {
      setProjectName(newValue);
    }
  };

  return (
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
      highlightFirstSuggestion
    />
  );
};
