import type { Schema, Attribute } from '@strapi/strapi';

export interface TestIngredient extends Schema.Component {
  collectionName: 'components_test_ingredients';
  info: {
    displayName: 'ingredient';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText;
    unity: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'test.ingredient': TestIngredient;
    }
  }
}
