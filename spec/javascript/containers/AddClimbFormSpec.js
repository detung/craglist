import AddClimbForm from '../../../app/javascript/react/containers/AddClimbForm';
import TextField from '../../../app/javascript/react/components/TextField';
import Select from '../../../app/javascript/react/components/Select';
import NumberField from '../../../app/javascript/react/components/NumberField';
import TextArea from '../../../app/javascript/react/components/TextArea';

describe('AddClimbForm', () => {
  let wrapper,
      toggleNewForm,
      addNewClimb;

  beforeEach(() => {
    toggleNewForm = jasmine.createSpy('toggleNewForm spy');
    addNewClimb = jasmine.createSpy('addNewClimb spy');
    spyOn(AddClimbForm.prototype, 'handleFormSubmit').and.callThrough();

    wrapper = mount(
      <AddClimbForm
        toggleNewForm={toggleNewForm}
        addNewClimb={addNewClimb}
      />
    );
  });

  it('renders 2 TextField components', () => {
    expect(wrapper.find(TextField)).toBePresent();
    expect(wrapper.find(TextField).length).toBe(2);
  });

  it('renders 2 Select components', () => {
    expect(wrapper.find(Select)).toBePresent();
    expect(wrapper.find(Select).length).toBe(2);
  })

  it('renders a NumberField component', () => {
    expect(wrapper.find(NumberField)).toBePresent();
  });

  it('renders a TextArea component', () => {
    expect(wrapper.find(TextArea)).toBePresent();
  });

  describe('handleFormSubmit', () => {
    it('should be invoked when the submit button is clicked', () => {
      wrapper.find('input.button').simulate('submit');
      expect(AddClimbForm.prototype.handleFormSubmit).toHaveBeenCalled();
      expect(addNewClimb).toHaveBeenCalled();
    });
  });
});
