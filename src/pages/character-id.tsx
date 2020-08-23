import React from "react";
import { Formik, Field, Form } from "formik";

interface IProps {
  emitCharacterID: (characterID: string) => void;
}

export default class CharacterIDFinder extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            realm: "Proudmoore",
            character: "Darthyoshi",
          }}
          onSubmit={async ({ realm, character }) => {
            const res = await fetch(`/api/character/find/${realm}/${character}`);

            const { characterID } = await res.json();
            if (!characterID) return console.warn("TODO handle missing character ID");

            this.props.emitCharacterID(characterID);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="realm">Realm</label>
              <Field name="realm" />

              <label htmlFor="character">Character</label>
              <Field name="character" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
