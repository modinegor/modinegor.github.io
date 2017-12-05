module.exports = function(_ref) {
    let t = _ref.types;

    return {
        visitor: {
            ExpressionStatement: function ExpressStatement(path) {
                let node = path.node,
                    expr = node.expression;

                if (!t.isCallExpression(expr)) return;
                if (expr.callee.name !== 'def') return;

                let [{value: type}, {value: class_name}, {properties: properties}] = expr.arguments;

                if (type !== 'class') return;

                let deft = [], valid = [];
                for (let property of properties) {
                    let {key: {name}, value: value} = property;

                    while (value !== undefined) {
                        let func = value.callee.property || value.callee,
                            args = value.arguments;

                        if (func.name === 'deft')
                            deft.push(t.expressionStatement(
                                t.assignmentExpression('=',
                                    t.memberExpression(t.thisExpression(), t.identifier(name)),
                                    args[0]))
                            );
                        else {
                            // TODO
                        }

                        value = value.callee.object;
                    }
                }

                let constructor = t.classMethod('constructor', t.identifier('constructor'), [], t.blockStatement(deft));

                path.replaceWith(t.ClassDeclaration(t.identifier(class_name), null, t.classBody([constructor]), []))
            }
        }
    }
};