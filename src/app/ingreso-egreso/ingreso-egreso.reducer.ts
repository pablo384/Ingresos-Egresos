import * as fromIngreEgre from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';


export interface IngresoEgresoState {
    items: IngresoEgreso[];
}
export interface AppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngreEgre.acciones): IngresoEgresoState {
    switch (action.type) {
        case fromIngreEgre.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(
                        item => {
                            return {
                                ...item
                            };
                        }
                    )
                ]
            };
        case fromIngreEgre.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}
