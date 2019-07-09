import React from 'react'
import Select from 'react-select'

// main
export const SelectNext = props => (
  <Select
    className="bg-transparent"
    theme={theme => ({
      ...theme,
      // borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: '#48bb78',
        primary: 'white',
      },
    })}
    styles={{
      menu: (provided, state) => ({
        ...provided,
        // borderBottom: '1px dotted pink',
        color: 'white',
        // padding: 20,
        backgroundColor: '#2d3748',
      }),
      option: (provided, state) => ({
        ...provided,
        // borderBottom: '1px dotted pink',
        color: state.isFocused
          ? state.isSelected
            ? 'white'
            : '#48bb78'
          : 'white',
        padding: 10,
        backgroundColor: state.isSelected ? '#48bb78' : 'transparent',
      }),
      control: provided => ({
        ...provided,
        // none of react-select's styles are passed to <Control />
        color: 'white',
        backgroundColor: 'transparent',
        minHeight: 42,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'

        return {
          ...provided,
          color: 'white',
          opacity,
          transition,
        }
      },
    }}
    {...props}
  />
)
