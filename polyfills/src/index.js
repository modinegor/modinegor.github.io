module.exports = (_ref) => {
    let t = _ref.types;

    return {
        visitor: {
            ExpressionStatement: (path) => {
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
                            let operator, right, left, alert;
                            func = func.name;
                            if (func === 'notnull' || func === 'notequal') {
                                operator = '===';
                                left = t.memberExpression(t.thisExpression(), t.identifier(name));
                                right = func === 'notnull' ? t.nullLiteral() : args[0];
                                alert = args[func === 'notnull' ? 0 : 1];
                            } else if (func === 'minl' || func === 'maxl') {
                                operator = func === 'minl' ? '<=' : '>=';
                                left = t.memberExpression(t.memberExpression(t.thisExpression(), t.identifier(name)), t.identifier('length'));
                                right = args[0];
                                alert = args[1];
                            } else if (func === 'minv' || func === 'maxv') {
                                operator = func === 'minv' ? '<=' : '>=';
                                left = t.memberExpression(t.thisExpression(), t.identifier(name));
                                right = args[0];
                                alert = args[1];
                            }

                            valid.push(t.ifStatement(
                                t.binaryExpression(operator, left, right),
                                t.blockStatement([
                                    t.expressionStatement(
                                        t.callExpression(
                                            t.memberExpression(
                                                t.identifier('console'),
                                                t.identifier('error')
                                            ),
                                            [alert]
                                        )
                                    ),
                                    t.returnStatement(
                                        t.booleanLiteral(false)
                                    )
                                ])
                            ));
                        }

                        value = value.callee.object;
                    }
                }

                let constructor = t.classMethod('constructor', t.identifier('constructor'), [], t.blockStatement(deft)),
                    valid_method = t.classMethod('method', t.identifier('isValid'), [], t.blockStatement(valid));


                path.replaceWith(t.ClassDeclaration(t.identifier(class_name),
                    null, t.classBody([constructor, valid_method]), []))
            }
        }
    }
};