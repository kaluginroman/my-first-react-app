import React from 'react';
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props shoul be in state", () => {
    const component = create(<ProfileStatus status="It's test in profile status" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("It's test in profile status");
  });

  test("after creation span should be displayed", () => {
    const component = create(<ProfileStatus status="It's test in profile status" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation input shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="It's test in profile status" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input");
    }).toThrow();
  });

  test("after creation span should contains correct status", () => {
    const component = create(<ProfileStatus status="It's test in profile status" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("It's test in profile status");
  });

  test("input should be displayed in edit mode instead of span", () => {
    const component = create(<ProfileStatus status="It's test in profile status" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("It's test in profile status");
  });

  test("callback should be called", () => {
    const mockCallBack = jest.fn()
    const component = create(<ProfileStatus status="It's test in profile status" updateStatus={mockCallBack}/>);
    const instance = component.getInstance();
    instance.handleDeactivateEditMode()
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});