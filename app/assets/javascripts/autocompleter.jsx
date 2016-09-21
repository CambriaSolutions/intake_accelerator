import React from 'react'
import Autosuggest from 'react-autosuggest'
import $ from 'jquery'


const getSuggestionValue = suggestion => {
  return suggestion.first_name + ' ' + suggestion.last_name;
}

const renderSuggestion = suggestion => {
  return (
    <span>{suggestion.first_name + ' ' + suggestion.last_name}</span>
  );
}

const renderSuggestionsContainer = ({ children, ...rest }) => (
  <div {...rest}>
    {children}
  </div>
);

export default class Autocompleter extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      involvedPeople: [],
      isLoading: false
    };

    this.lastRequestId = null;
  }

  loadSuggestions(value) {
    // Cancel the previous request
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    var self = this;
    this.lastRequestId = setTimeout(function() {
      $.get('/people/search', { query: value } )
        .done(function (result) {
          self.setState({
            isLoading: false,
            suggestions: result
          })
      });
    }, 1000);
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested({ value }) {
    this.loadSuggestions(value);
  };

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    var involvedPeople = this.state.involvedPeople.slice(0);
    involvedPeople.push(suggestion);
    this.onSuggestionsClearRequested();
    this.setState({
      value: '',
      involvedPeople: involvedPeople
    });
  };

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, involvedPeople, isLoading } = this.state;
    const inputProps = {
      placeholder: 'Search people...',
      id: 'referral_involved_people',
      value,
      onChange: this.onChange.bind(this)
    };

    const involvedPeopleIds = involvedPeople.map(function(person) { return person.id } );

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          getSuggestionValue={getSuggestionValue.bind(this)}
          renderSuggestion={renderSuggestion.bind(this)}
          inputProps={inputProps}
          renderSuggestionsContainer={renderSuggestionsContainer.bind(this)} />
        <ul>
          { involvedPeople.map(function(person, i) {
            return <li key={i}>
              {person.first_name} {person.last_name}
              <input type='hidden' name='referral[involved_people_ids][]' value={person.id} />
            </li>;
          })}
        </ul>
      </div>
    );
  }
}


