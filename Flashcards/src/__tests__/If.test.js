import React from 'react';
import { shallow } from "enzyme";
import If from "../components/If";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<If />);
});

it("testing the rest of the conditional", () => {
    shallow(
      <If test={true}>
        <span>Test</span>
      </If>
    );
  });