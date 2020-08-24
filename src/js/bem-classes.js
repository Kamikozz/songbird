const getPropClassName = (propsArray, propName) => {
  const value = propsArray[propName];
  const { _class } = value;

  return [_class, value];
};

const BEM_PARTS = {
  BLOCK: 'block',
  BLOCK_ELEMENT: 'block_element',
  BLOCK_MODIFIER: 'block_modifier',
  BLOCK_ELEMENT_MODIFIER: 'block_element_modifier',
};

class BEMClasses {
  constructor(blocks) {
    this.blocks = blocks;
    this.classes = {};
    this.relations = [];

    this.getClassName = this.getClassName.bind(this);

    this.initClasses();
  }

  initClasses() {
    // Add block to the relations
    this.addBlocks();
  }

  getClassName(classContainerObject) {
    const foundRelation = this.relations.find((item) => item.id === classContainerObject);

    return foundRelation ? foundRelation.className : '';
  }

  allocateClassesContainer(...varNames) {
    const [block, elementOrModifier, modifier] = varNames;

    switch (varNames.length) {
      case 1: {
        this.classes[block] = {};
        break;
      }
      case 2: {
        this.classes[block][elementOrModifier] = {};
        break;
      }
      case 3: {
        this.classes[block][elementOrModifier][modifier] = {};
        break;
      }
      default:
        break;
    }
  }

  bindClassesWithClassNames(kind, ...varClassNames) {
    const [block, elementOrModifier, modifier] = varClassNames;

    let id;
    let className;

    switch (kind) {
      case BEM_PARTS.BLOCK: {
        const [blockVarName, blockClassName] = block;

        id = this.classes[blockVarName];
        className = blockClassName;
        break;
      }
      case BEM_PARTS.BLOCK_MODIFIER: {
        const [blockVarName, blockClassName] = block;
        const [modifierVarName, modifierClassName] = elementOrModifier;

        id = this.classes[blockVarName][modifierVarName];
        className = `${blockClassName}_${modifierClassName}`;
        break;
      }
      case BEM_PARTS.BLOCK_ELEMENT: {
        const [blockVarName, blockClassName] = block;
        const [elementVarName, elementClassName] = elementOrModifier;

        id = this.classes[blockVarName][elementVarName];
        className = `${blockClassName}__${elementClassName}`;
        break;
      }
      case BEM_PARTS.BLOCK_ELEMENT_MODIFIER: {
        const [blockVarName, blockClassName] = block;
        const [elementVarName, elementClassName] = elementOrModifier;
        const [modifierVarName, modifierClassName] = modifier;

        id = this.classes[blockVarName][elementVarName][modifierVarName];
        className = `${blockClassName}__${elementClassName}_${modifierClassName}`;
        break;
      }
      default:
        break;
    }

    this.relations.push({
      id, // block,
      className, // : blockClassName,
    });
  }

  addBlocks() {
    const blockVarNames = Object.keys(this.blocks);

    blockVarNames.forEach((blockVarName) => {
      const [blockClassName, block] = getPropClassName(this.blocks, blockVarName);

      this.allocateClassesContainer(blockVarName);
      this.bindClassesWithClassNames(
        BEM_PARTS.BLOCK,
        [blockVarName, blockClassName],
      );

      // Add all block_modifiers to the relations
      this.addBlockModifiers(block, blockVarName, blockClassName);

      // Add all block_elements to the relations and their modifiers
      this.addBlockElements(block, blockVarName, blockClassName);
    });
  }

  addBlockModifiers(block, blockVarName, blockClassName) {
    const { modifiers } = block;

    if (modifiers) {
      const modifierVarNames = Object.keys(modifiers);

      modifierVarNames.forEach((modifierVarName) => {
        const [modifierClassName] = getPropClassName(modifiers, modifierVarName);

        this.allocateClassesContainer(blockVarName, modifierVarName);
        this.bindClassesWithClassNames(
          BEM_PARTS.BLOCK_MODIFIER,
          [blockVarName, blockClassName],
          [modifierVarName, modifierClassName],
        );
      });
    }
  }

  addBlockElementModifiers(
    element,
    blockVarName,
    blockClassName,
    elementVarName,
    elementClassName,
  ) {
    const { modifiers } = element;

    if (modifiers) {
      const modifierVarNames = Object.keys(modifiers);

      modifierVarNames.forEach((modifierVarName) => {
        const [modifierClassName] = getPropClassName(modifiers, modifierVarName);

        this.allocateClassesContainer(blockVarName, elementVarName, modifierVarName);
        this.bindClassesWithClassNames(
          BEM_PARTS.BLOCK_ELEMENT_MODIFIER,
          [blockVarName, blockClassName],
          [elementVarName, elementClassName],
          [modifierVarName, modifierClassName],
        );
      });
    }
  }

  addBlockElements(block, blockVarName, blockClassName) {
    const { elements } = block;

    if (elements) {
      const elementVarNames = Object.keys(elements);

      elementVarNames.forEach((elementVarName) => {
        const [elementClassName, element] = getPropClassName(elements, elementVarName);

        this.allocateClassesContainer(blockVarName, elementVarName);
        this.bindClassesWithClassNames(
          BEM_PARTS.BLOCK_ELEMENT,
          [blockVarName, blockClassName],
          [elementVarName, elementClassName],
        );

        // Add all block_element_modifiers to the relations
        this.addBlockElementModifiers(
          element,
          blockVarName,
          blockClassName,
          elementVarName,
          elementClassName,
        );
      });
    }
  }
}

export default BEMClasses;
