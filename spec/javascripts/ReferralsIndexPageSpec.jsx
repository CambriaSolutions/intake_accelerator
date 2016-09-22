import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import ReferralsFilter from 'ReferralsFilter'
import ReferralsIndexPage from 'ReferralsIndexPage'
import ReferralsTable from 'ReferralsTable'
import TestUtils from 'react-addons-test-utils'

describe('ReferralsIndexPage', () => {
  it('renders ReferralsFilter', () => {
    const view = TestUtils.renderIntoDocument(<ReferralsIndexPage location={{}} />)
    const filters = TestUtils.scryRenderedComponentsWithType(view, ReferralsFilter)
    expect(filters.length).toEqual(1)
  })

  it('renders ReferralsTable', () => {
    const view = TestUtils.renderIntoDocument(<ReferralsIndexPage location={{}} />)
    const tables = TestUtils.scryRenderedComponentsWithType(view, ReferralsTable)
    expect(tables.length).toEqual(1)
  })
})
