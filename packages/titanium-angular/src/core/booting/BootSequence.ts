import { BootStep } from './BootStep';

export class BootSequence {
    private steps: Set<BootStep> = new Set();

    addStep(step: BootStep): void {
        this.steps.add(step);
    }

    invoke(platform) {
        console.log('Invoking platform boot sequence');
        
        for (let step of this.steps) {
            step.invoke(platform);
        }
    }
}